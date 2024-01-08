export const formatSpendingsDate = (spent_at: Date): string => {
    return spent_at
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
