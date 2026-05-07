from rest_framework import serializers
from .models import Order, OrderItem
from apps.products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    # En lecture, on peut inclure les détails du produit
    # En écriture, on attend juste l'ID du produit
    product_details = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_details', 'quantity', 'unit_price']
        extra_kwargs = {
            'unit_price': {'read_only': True} # Peut être défini par le backend selon le prix du produit
        }

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer_name', 'status', 'total_price', 'items', 'created_at', 'updated_at']
        read_only_fields = ['total_price']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        
        total_price = 0
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']
            unit_price = product.price
            
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                unit_price=unit_price
            )
            total_price += unit_price * quantity
            
        order.total_price = total_price
        order.save()
        return order
