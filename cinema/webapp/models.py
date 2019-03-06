from django.db import models
import random
import string
from django.conf import settings

class Movie(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)
    poster = models.ImageField(upload_to='posters', null=True, blank=True)
    release_date = models.DateField()
    finish_date = models.DateField(null=True, blank=True)
    categories = models.ManyToManyField('Category', related_name='film_category', verbose_name='Categories', blank=True)

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
    hall = models.ForeignKey(Hall, on_delete=models.PROTECT, related_name='seats')
    row = models.CharField(max_length=10)
    seat = models.CharField(max_length=10)

    def __str__(self):
        return self.seat

class Show(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.PROTECT, related_name='shows')
    hall = models.ForeignKey(Hall, on_delete=models.PROTECT, related_name='shows')
    start_date = models.DateTimeField()
    finish_date = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return "%s, %s" % (self.movie, self.hall)

class Discount(models.Model):
    name = models.CharField(max_length=255)
    discount_price = models.DecimalField(max_digits=6, decimal_places=2)
    starts_at = models.DateTimeField(null=True, blank=True)
    finishes_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name

class Ticket(models.Model):
    show = models.ForeignKey(Show, on_delete=models.PROTECT, related_name='tickets')
    seat = models.ForeignKey(Seat, on_delete=models.PROTECT, related_name='tickets')
    discount = models.ForeignKey(Discount, on_delete=models.PROTECT, related_name='tickets', blank=True, null=True)
    returned = models.BooleanField(default=False)

    def __str__(self):
        return "Show %s Seat %s" % (self.show, self.seat)

def generate_code():
    code = ""
    for i in range(0, settings.BOOKING_CODE_LENGTH):
        code += random.choice(string.digits)
    return code


BOOKING_STATUS_CHOICES = [
    ('created', 'Created'),
    ('sold', 'Sold'),
    ('canceled', 'Canceled'),
]


class Booking(models.Model):
    code = models.CharField(max_length=10, unique_for_date='created_at', default=generate_code, editable=False)
    show = models.ForeignKey(Show, on_delete=models.PROTECT, related_name='booking')
    seats = models.ManyToManyField(Seat, related_name='booking')
    status = models.CharField(max_length=20, choices=BOOKING_STATUS_CHOICES, default='created')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s, %s" % (self.show, self.code)

    def get_seats_display(self):
        seats = ""
        for seat in self.seats.all():
            seats += "R%sS%s " % (seat.row, seat.seat)
            return seats.rstrip()