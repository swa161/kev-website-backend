type userRegister = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    title?: string,
    description?: string,
    imageUrl?: string,
    phoneNumber?: number,
    physicalAddress?: string,
}

type userLogin = {
    email: string,
    password: string,
}

type user = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    title: string,
    description: string,
    imageUrl: string,
    phoneNumber: number,
    physicalAddress: string,
    authToken: string,
    createdAt: string,
}

type userUpdate = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    currentPassword: string,
    title?: string,
    description?: string,
}