export interface PollingOptions {
    interval: number;
    timeout?: number;
    condition: (data: any) => boolean;
}

// super reusable polling helper (probably overkill for now but whatever, it's clean and I'm proud of it)
export const poll = async (
    fetchFunction: () => Promise<any>,
    options: PollingOptions
): Promise<any> => {
    const { interval, timeout = 30000, condition } = options;

    let elapsedTime = 0;

    return new Promise((resolve, reject) => {
        const checkCondition = async () => {
            try{
                const result = await fetchFunction();

                if(condition(result)){
                    resolve(result);
                    return;
                }

                elapsedTime += interval;

                if(elapsedTime >= timeout){
                    reject(new Error("Polling timed out"));
                    return;
                }

                // retry after interval
                setTimeout(checkCondition, interval);
            }catch(error){
                reject(error);
            }
        }

        checkCondition();
    })
}