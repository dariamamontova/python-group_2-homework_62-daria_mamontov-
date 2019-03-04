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

