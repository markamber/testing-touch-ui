import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Code } from '@mantine/core';
import { useForm } from '@mantine/form';
import {Link} from "@tanstack/react-router";

export function StarterStepper() {
    const [active, setActive] = useState(0);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            email: '',
            session: '',
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    name: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
                };
            }

            if (active === 1) {
                return {
                    email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
                };
            }

            return {};
        },
    });

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 3 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Stepper active={active}>
                <Stepper.Step label="First step" description="Your Name">
                    <TextInput
                        label="Name"
                        placeholder="Name"
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />

                </Stepper.Step>

                <Stepper.Step label="Second step" description="Personal information">

                    <TextInput
                        mt="md"
                        label="Email"
                        placeholder="Email"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                </Stepper.Step>

                <Stepper.Step label="Final step" description="Social media">
                    <TextInput
                        label="Session Name"
                        placeholder="Happy Times s1e2"
                        key={form.key('session')}
                        {...form.getInputProps('session')}
                    />
                </Stepper.Step>
                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(form.getValues(), null, 2)}
                    </Code>
                </Stepper.Completed>
            </Stepper>

            <Group justify="flex-end" mt="xl">
                {active !== 0 && (
                    <Button variant="default" onClick={prevStep}>
                        Back
                    </Button>
                )}
                {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
                {active === 3 && <Button component={Link} to={'/control/newmixer'}>Start</Button>}
            </Group>
        </>
    );
}