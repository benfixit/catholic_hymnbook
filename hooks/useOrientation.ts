import { useEffect, useState } from "react";
import { Dimensions } from "react-native"
import { OrientationType } from "@/typings";

const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
}

export const useOrientation = () => {
    const [orientation, setOrientation] = useState<OrientationType>(
        isPortrait() ? "PORTRAIT" : "LANDSCAPE"
    );

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ screen}) => {
            setOrientation(screen.height >= screen.width ? "PORTRAIT" : "LANDSCAPE");
        });

        return () => subscription?.remove();
    }, []);

    return orientation;
}