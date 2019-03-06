from django.contrib import admin
from webapp.models import Movie, Category, Hall, Seat, Show, Discount

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

class ShowAdmin(admin.ModelAdmin):
    list_display = ['pk', 'movie', 'start_date']
    ordering = ['-start_date']
    search_fields = ['movie', 'id']

class DiscountAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'discount_price']
    search_fields = ['name', 'id']

admin.site.register(Movie, MovieAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Hall, HallAdmin)
admin.site.register(Seat, SeatAdmin)
admin.site.register(Show, ShowAdmin)
admin.site.register(Discount, DiscountAdmin)

