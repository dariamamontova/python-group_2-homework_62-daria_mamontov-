from django.contrib import admin
from webapp.models import Movie, Category, Hall, Seat

class MovieAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'release_date']
    ordering = ['-release_date']
    search_fields = ['name', 'id']


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name']
    ordering = ['name']
    search_fields = ['name', 'id']

class HallAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name']
    ordering = ['name']
    search_fields = ['name', 'id']

class SeatAdmin(admin.ModelAdmin):
    list_display = ['pk', 'seat', 'hall']
    ordering = ['hall']
    search_fields = ['seat', 'id']

admin.site.register(Movie, MovieAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Hall, HallAdmin)
admin.site.register(Seat, SeatAdmin)

