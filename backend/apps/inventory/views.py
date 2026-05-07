from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Ingredient
from .serializers import IngredientSerializer

class IngredientViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour le CRUD des Ingrédients (Inventory).
    """
    queryset = Ingredient.objects.all().order_by('name')
    serializer_class = IngredientSerializer

    @action(detail=False, methods=['get'])
    def low_stock(self, request):
        """
        Endpoint personnalisé pour récupérer uniquement les ingrédients en rupture de stock
        ou dont le niveau est sous le seuil minimum.
        """
        # On ne peut pas filtrer directement sur la property is_low_stock avec le queryset Django facilement
        # sans F objects, donc on utilise F objects pour filtrer en BDD
        from django.db.models import F
        low_stock_ingredients = Ingredient.objects.filter(quantity_in_stock__lte=F('minimum_stock_level'))
        serializer = self.get_serializer(low_stock_ingredients, many=True)
        return Response(serializer.data)
