# Generated by Django 2.1.7 on 2019-03-16 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0013_auto_20190316_1055'),
    ]

    operations = [
        migrations.AddField(
            model_name='hall',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
    ]
