import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const res = await fetch(`http://192.168.20.157:3000/getstate`);
    const item = await res.json();

    return { item };
};