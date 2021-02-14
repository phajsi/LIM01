from django.contrib import admin
from .models import UserAccount

# Register your models here.
class AccountAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'is_staff', 'is_active', 'is_superuser')
    search_fields = ('email', 'name')

admin.site.register(UserAccount, AccountAdmin)
