from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def index(request):
    # return HttpResponse('Hello from Python!')
    # return render(request, "index.html")
	return HttpResponse("This is your home page.")

def db(request):
	return HttpResponse("This is your db.")
    # greeting = Greeting()
    # greeting.save()
	#
    # greetings = Greeting.objects.all()
	#
    # return render(request, "db.html", {"greetings": greetings})
