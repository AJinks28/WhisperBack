import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  //we converted user as string in session, so here we are converting it to mongoose object
  const userId = new mongoose.Types.ObjectId(_user._id);


  try {
    // const unwoundUser = await UserModel.aggregate([
    //   { $match: { _id: userId } },
    //   { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } }
    // ]).exec();
    // console.log(unwoundUser);
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } }, // Separates the message array into individual documents
      { $sort: { 'messages.createdAt': -1 } }, // Sorts the documents by createdAt field in descending order
      { $group: { _id: '$_id', messages: { $push: '$messages' } } }, // Groups the messages back into an array
      { $project: { _id: 1, messages: 1 } } // Optionally, to include only the required fields
    ]).exec();

    if (!user || user.length === 0) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { messages: user[0].messages },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
