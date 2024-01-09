export const formatSpendingsDate = (spent_at: string): string => {
    return new Date(spent_at)
        .toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
        .split(' at ')
        .reverse()
        .join(' - ');
};
