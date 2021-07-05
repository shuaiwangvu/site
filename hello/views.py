from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader



# Create your views here.
def index(request):

    template = loader.get_template('hello/home_page.html')
    context = {}
    return HttpResponse(template.render(context, request))


def db(request):
	return HttpResponse("This is your db.")
    # greeting = Greeting()
    # greeting.save()
	#
    # greetings = Greeting.objects.all()
	#
    # return render(request, "db.html", {"greetings": greetings})
