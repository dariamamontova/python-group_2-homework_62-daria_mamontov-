# Generated by Django 2.1.7 on 2019-03-16 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0012_movie_categories'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
    ]
