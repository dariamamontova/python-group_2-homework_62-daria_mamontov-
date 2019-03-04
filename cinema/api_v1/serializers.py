from webapp.models import Movie, Category
from rest_framework import serializers

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'name', 'description', 'poster', 'release_date', 'finish_date', 'category')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'description')