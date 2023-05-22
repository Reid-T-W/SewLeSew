export const donationProgress = (raised, required) => {
    const value = (raised / required) * 100;
    return value;  
}
