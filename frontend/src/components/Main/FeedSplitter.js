import React from 'react';
import { useSelector } from 'react-redux';
import ActorFeed from './ActorFeed';
import CompanyFeed from './CompanyFeed';

const FeedSplitter = () => {
    const sessionUser = useSelector(state => state.session.user)
    if (sessionUser.purpose === 'actor') return <ActorFeed/>
    if (sessionUser.purpose === 'company') return <CompanyFeed/>
    return null;
}

export default FeedSplitter
