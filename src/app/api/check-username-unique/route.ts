import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { z } from 'zod';
import { usernameValidation } from '@/schemas/signUpSchema';

//we validate username with help of zod
//we make query schema 
const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  //URL:localhost:3000/api/cuu?username=jinks?phone=android
  try {
    //accesing url(localhost:3000/api/cuu?username=jinks?phone=android)
    const { searchParams } = new URL(request.url);
    //username=jinks
    const queryParams = {
      username: searchParams.get('username'),
    };

    //safeParse method will validate based on UsernameQuerySchema
    const result = UsernameQuerySchema.safeParse(queryParams);
    console.log(result);
    if (!result.success) {
      // result.error.format() contains all errors
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(', ')
              : 'Invalid query parameters',
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: 'Username is already taken',
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'Username is unique',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking username:', error);
    return Response.json(
      {
        success: false,
        message: 'Error checking username',
      },
      { status: 500 }
    );
  }
}
