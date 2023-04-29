import {DataTypes} from 'sequelize';
import {gzipSync, gunzipSync} from 'zlib';

import { sequelize } from "../../loaders";
import { Post } from './post';

const AVERAGE_WPM = 225;



export const PostModel = Post.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        validate: {
            len: [10, 100]
        }
    },
    content: {
        type: DataTypes.TEXT,
        validate: {
            len: [1000, 100000],
        },
        set(value: string) {
           const minutes = getTimeToReadInMinutes(value);
            this.setDataValue('ttr', minutes);
            const gzippedBuffer = gzipSync(value);
            this.setDataValue('content', gzippedBuffer.toString('base64'));
        },
        get() {
            const storedValue = this.getDataValue('content');
            const gzippedBuffer = Buffer.from(storedValue, 'base64');
            const unzippedBuffer = gunzipSync(gzippedBuffer);
            return unzippedBuffer.toString();
        }
    },
    // time to read
    ttr: {
        type: DataTypes.INTEGER,
    }
}, {modelName: 'post', sequelize, updatedAt: true, createdAt: true})


function getTimeToReadInMinutes(content: string): number {
    const words = content.trim().split(/\s+/);
    const minutes = Math.ceil(words.length / AVERAGE_WPM);
    return minutes;
}