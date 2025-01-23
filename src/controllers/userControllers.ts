import User from '../models/User';

export async function userRegister(userData: { userName: string, email: string, password: string, role: string }): Promise<boolean> {
    const userAlreadyExists = await User.findOne({
        $or: [
            { email: userData.email },
            { name: userData.userName }
        ]
    })
    if (userAlreadyExists) {
        return false;
    } else {
        const newUser = new User(userData);
        await newUser.save();
        return true;
    }
}

export async function userLogin(userData: { credential: string, password: string }): Promise<boolean> {
    // Find user by email or userName and password
    const user = await User.findOne({
        $or : [
            { email: userData.credential, password: userData.password },
            { userName: userData.credential, password: userData.password }
        ]
    })
    // If user is null, the user is not registered
    return user !== null;
}