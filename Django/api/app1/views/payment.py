
import razorpay
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

@api_view(['POST'])
def create_order(request):
    data = request.data
    amount = int(data['amount']) * 100  # in paise
    order = client.order.create({'amount': amount, 'currency': 'INR', 'payment_capture': '0'})
    return Response({'order': order, 'key': settings.RAZORPAY_KEY_ID})

@csrf_exempt
@api_view(['POST'])
def verify_payment(request):
    params = request.data
    try:
        client.utility.verify_payment_signature(params)
        client.payment.capture(params['razorpay_payment_id'], params['amount'])
        return Response({'status': 'success'})
    except:
        return Response({'status': 'failure'}, status=400)
