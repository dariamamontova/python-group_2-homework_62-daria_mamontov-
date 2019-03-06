from django.db import models

class Movie(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)
    poster = models.ImageField(upload_to='posters', null=True, blank=True)
    release_date = models.DateField()
    finish_date = models.DateField(null=True, blank=True)
    category = models.ManyToManyField('Category', related_name='film_category', verbose_name='Categories', blank=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)

    def __str__(self):
        return self.name

class Hall(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Seat(models.Model):
    hall = models.ForeignKey(Hall, on_delete=models.PROTECT, blank=True, verbose_name='Hall', related_name='seats')
    row = models.IntegerField(null=True, blank=True)
    seat = models.CharField(max_length=10)

    def __str__(self):
        return self.seat

class Show(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.PROTECT, blank=True, related_name='show_movie')
    hall = models.ForeignKey(Hall, on_delete=models.PROTECT, blank=True, related_name='show_hall')
    start_date = models.DateTimeField()
    finish_date = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

class Discount(models.Model):
    name = models.CharField(max_length=255)
    discount_price = models.DecimalField(max_digits=6, decimal_places=2)
    starts_at = models.DateTimeField(null=True, blank=True)
    finishes_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name

