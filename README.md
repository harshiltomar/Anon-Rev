# Brief:

- Nextjs based fullstack projet aimed at Anonymous Review System
- User can signup + OTP verification. Then get's a page where he can generate his own link.
- New user can post Anonymous Review's onto that page

# Techstack

- Nextjs, Typescript
- MongoDb, Resend for mailing system
- Encrption by bcryptjs

# Home Page Signup Logic:

![alt text](image-1.png)

# New User Verification Flow:

![alt text](image.png)

# Verify Code Flow:

![alt text](image-2.png)

# Messages Structure

- Idea: User can accept messages and status
- API
  - POST: status update
  - GET: status of messages
  - GET: all messages of current logged in user (Aggregation Pipelining)
  - POST: send messages + save them
- Use session info and session id for the same
