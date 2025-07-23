from django.core import paginator
from django.shortcuts import render
from django.core.paginator import Paginator,EmptyPage, PageNotAnInteger

from rest_framework import status
#rest framework import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from  rest_framework.response import Response
from rest_framework.serializers import Serializer


# local imports 
from app1.models import *
from app1.serializers import ProductSerialisers, ReviewSerializer

@api_view(['GET'])
def getProducts(request):
    print("hello")
    query = request.query_params.get('keyword', '')
    # query = request.query_params.get('keyword')
    # print("query",query)
    # if query == None:
    #     query = ''

    products = Product.objects.filter(name__icontains= query).order_by('-_id')
    # print("hellllllllllllllllllllllllllllllllllllllll")
    # print(products)
    page = request.query_params.get('page', 1)

    # page = request.query_params.get('page')
    # if page is None or page.strip() == '':
    #     page=1
    
    try:
        page =  int(page)
    except:
        page = 1
    paginator = Paginator(products, 8)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
         products = paginator.page(1)
    except EmptyPage:
         products = paginator.page(paginator.num_pages)

    serializer= ProductSerialisers(products,many=True,context={'request': request})
    return Response({'products':serializer.data,'page':page,'pages':paginator.num_pages})

# top products
@api_view(['GET'])
def getTopProduct(request):
    product = Product.objects.filter(rating__gte =4).order_by('-rating')[0:5]
    serializer=ProductSerialisers(product, many=True,context={'request': request})
    return Response(serializer.data)

#get single product
@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id = pk)
    print("product",product)
    serializer = ProductSerialisers(product , many=False)
    print("serializer",serializer.data)
    return Response(serializer.data)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def createProductReview(request, pk):
#     user= request.user
#     product= Product.objects.get(_id = pk)
#     data = request.data

#     # 1 review already exists
#     alreadyExists = product.review_set.filter(user=user).exists()

#     if alreadyExists :
#         content = {'details' : 'product already reviewd'}
#         return Response(content , status=status.HTTP_400_BAD_REQUEST)
    
#     # 2 No rating or 0
#     elif data['rating'] == 0:
#         content = {'details': 'please select a rating'}
#         return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
#     else:
#         review = Review.objects.create(
#             user= user,
#             name=user.first_name,
#             rating = data['rating'],
#             comments=data['comment'],
#             product=product
            
#         )
#         # reviews= product.reviews_set.all()
#         # print(reviews)
#         # product.numReviews = len(reviews)
#         # product.reviews=len(review)
#         # total =0
#         # for i in reviews:
#         #     total += i.rating
#         # product.rating = total / len(reviews)
#         reviews = product.review_set.all()
#         product.reviews = reviews.count()
#         total = sum(r.rating for r in reviews)
#         product.rating = total / product.reviews
        


#         product.save()
#         return Response('Review Added')


    
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    
        user = request.user
        product = Product.objects.get(_id=pk)
        data = request.data
        print("data",data)
        print("user",user)

        # 1: Check for existing review

        existing_review = Review.objects.filter(product=product, user=user).first()
        if existing_review:
            return Response({'detail': 'Product already reviewed'}, status=status.HTTP_400_BAD_REQUEST)
              # if product.review_set.filter(user=user).exists():
        #     return Response({'detail': 'Product already reviewed'}, status=status.HTTP_400_BAD_REQUEST)

        # 2: Ensure rating is > 0
        if data.get('rating', 0) == 0:
            return Response({'detail': 'Please select a rating'}, status=status.HTTP_400_BAD_REQUEST)

        # 3: Create and save review
        review = Review.objects.create(
            product=product,
            user=user,
            name=user.first_name,
            rating=data['rating'],
            comments=data['comments']
        )

        # 4: Update product's aggregated data
        reviews = product.review_set.all()
        product.reviews = reviews.count()
        product.rating = sum(r.rating for r in reviews) / product.reviews
        product.save()

        return Response('Review Added')

    