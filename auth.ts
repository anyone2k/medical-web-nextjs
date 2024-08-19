import NextAuth from "next-auth"
import Patient from "@/models/Patient"
import Google from "next-auth/providers/google"
import connectDB from '@/config/database';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })],
  callbacks:{
    signIn: async ({profile}) => {
      // use the Patient model to check if the user is a patient
      await connectDB();
      const isPatient = await Patient.findOne({email: profile.email});
      if (!isPatient) {
        console.log("Creating new patient profile");
        // Truncate user name if too long
        const username = profile.name.slice(0, 20);

        await Patient.create({
          name: username,
          email: profile.email,
          profilePicture: profile.picture,
        });
      }
      return true;
    },
     // Modifies the session object
     async session({ session }) {
      // 1. Get user from database
      const user = await Patient.findOne({ email: session.user.email });
      // 2. Assign the user id to the session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  }
})