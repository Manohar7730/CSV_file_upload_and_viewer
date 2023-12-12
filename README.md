# CSV_file_upload_and_viewer

https://csv-file-upload-and-view.onrender.com

1) started the project with npm init and installed required depencies and created reqiuired folders for the project.
2) using express , created server and successfully running on local port.
3) from index app is connected to routers and controllers with express.
4) Created a project , cluster and database in mongo atlas.
5) server is connected to database of mongoAtlas and created database url in .env file
6) created Schema for file and used multer for destination and file name
7) created frontend home screen for upload was success
8) uploadcontroller working good and files are uploading with multer
9) now added some divs like search, delete and view button in frontend and improved css for good appearance and added js for working of search option with filename
![Screenshot 2023-05-30 174747](https://github.com/Manohar7730/CSV_file_upload_and_viewer/assets/120391462/12c5a365-6670-4545-a504-132bd242ff33)
10) added router and controllers of render , when view button click it will redirect to file page by using specific file id
11) added basic css to file page to look better
12) using csv-parser , we shared the parsing results of csv file by sending data as array to the file page
13) now added search input bar to file page in ejs and and added css and javascript for fecthing input in the page
14) added pagenation at fronend and backend , both working good, and add css for good appearance of file page
![Screenshot 2023-05-30 204103](https://github.com/Manohar7730/CSV_file_upload_and_viewer/assets/120391462/a30aae9b-3194-439f-8322-8a31589fa51a)
