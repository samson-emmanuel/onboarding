
curl -X 'GET' \
  'https://onboardingservice-812204315267.europe-west1.run.app/api/Gallery/get-any-images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NWY3ZjhiZC1lY2UyLTQ1NmQ'
Request URL
https://onboardingservice-812204315267.europe-west1.run.app/api/Gallery/get-any-images
Server response
Code	Details
200	
Response body
Download
{
  "message": "Request Successful",
  "result": [
    {
      "id": 7,
      "imageName": "gbemiga.jpg",
      "imageBase64": "/9j/4AAQSkZJRgABAQAAAQABAAD/wAARCAHgAeADASIAAhEBAxEB/8QBogAAAQUBAQEBAQEAAAAAAAA",
      "imageType": "GENERAL",
      "uploadedAt": "2025-11-24T10:04:29.974381Z",
      "uploadedBy": "sam@gmail.com"
    },
    {
      "id": 6,
      "imageName": "ceo.jpg",
      "imageBase64": "/9j/4AAQSkZJRgABAQAAAQABAAD/wAARCAHgAeADASI",
      "imageType": "GENERAL",
      "uploadedAt": "2025-11-24T10:03:52.021045Z",
      "uploadedBy": "sam@gmail.com"
    }
  ],
  "statusCode": "200",
  "isSuccessful": true,
  "timeStamp": "2025-11-24T11:00:31.5725843Z"
}