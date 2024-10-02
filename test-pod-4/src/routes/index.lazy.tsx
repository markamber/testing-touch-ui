import { createLazyFileRoute } from '@tanstack/react-router'
import {Slider} from "@mantine/core";
import {useState} from "react";

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    const [value, setValue] = useState(40);

    return (
        <Slider
            size="xl"
            value={value}
            onChange={setValue}
            marks={[
                { value: 20, label: '20%' },
                { value: 50, label: '50%' },
                { value: 80, label: '80%' },
            ]}
        />
    )
}