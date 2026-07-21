import bcrypt from "bcrypt";

const password = "hello123";

const test = async () => {
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Original:", password);
    console.log("Hashed:", hashedPassword);
};

test();