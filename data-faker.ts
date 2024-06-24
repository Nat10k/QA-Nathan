import { urlToBuffer } from "./utils";
import * as fs from 'fs';
import { faker } from '@faker-js/faker';

const makeFakeAvatar = async (imgSavePath : string) => {
    const imgURL = faker.image.avatarGitHub();
    const imgBuffer = await urlToBuffer(imgURL);
    fs.writeFileSync(imgSavePath, imgBuffer);
}

const makeFakeTextFile = async (filePath) => {
    fs.writeFileSync(filePath, "Airline : " + faker.airline.airline().name + "\nAircraft Type : " + faker.airline.aircraftType());
}

export {makeFakeAvatar, makeFakeTextFile};