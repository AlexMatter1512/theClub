import type { Lista } from '../../../../../../common/script/models';

export const load = async ({locals}) => {
    // you can also fetch all records at once via getFullList
    const liste = await locals.pb.collection('liste').getFullList<Lista>({
        sort: '-created',
    });

    return {
        liste
    };
};