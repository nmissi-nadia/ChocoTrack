from rest_framework import serializers
from .models import Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    is_low_stock = serializers.ReadOnlyField()

    class Meta:
        model = Ingredient
        fields = '__all__'
