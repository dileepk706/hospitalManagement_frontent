import React from 'react';
import { Link } from 'react-router-dom';

interface CardComponentProps {
    image: string;
    title?: string;
    discription?: string;
    link?: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ image, title, discription, link }) => {
    return (
        <div className="w-44 h-96  rounded overflow-hidden shadow-lg shrink-0 md:w-60 md:h-auto">
            <Link to={link ?? '/'} ><img className="w-full" src={image} alt="Sunset in the mountains" /></Link>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur
                </p>
            </div>
        </div>
    )
}

export default CardComponent

