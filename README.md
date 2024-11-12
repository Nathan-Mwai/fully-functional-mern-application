<!-- BACKEND FOLDER -->
- routes folder defines the routes
- controllers folder is used to create the function for the routes
- from the user models, timestamps gives me the created at and updated at fields

    - resetPasswordToken = for updating password
    - resetPasswordExpiresAt = for making the reset secure I.e expires in 1 hr
    - verificationToken = verify accounts
    - verificationTokenExpiresAt = To increase the security