export DJANGO_SUPERUSER_USERNAME=admin
export DJANGO_SUPERUSER_PASSWORD=admin
export DJANGO_SUPERUSER_EMAIL=admin@gmail.com

python manage.py migrate
python manage.py createsuperuser --noinput
python manage.py runserver 0.0.0.0:8000