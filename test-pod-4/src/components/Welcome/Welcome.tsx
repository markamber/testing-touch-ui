import {Title, Text, Anchor, Box, Space} from '@mantine/core';
import classes from './Welcome.module.css';
import {Link} from "@tanstack/react-router";
//import '../../lib/root100.css'

export function Welcome() {
  return (
    <>
        <Box
            ta={"center"}
        >
            <Title className={classes.title} >
                Welcome to{' '}
                <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                    Podcart V3
                </Text>
            </Title>
            <Text c="dimmed" size="lg" maw={580} mx="auto" mt="xl">
                Welcome to a new experience.
            </Text>
            <Space h="xl" />

        </Box>

        <Anchor
            variant="gradient"
            gradient={{ from: 'pink', to: 'yellow' }}
            to="/start"
            component={Link}
            className={classes.anchorBottom}
        >
            Start Session →
        </Anchor>


    </>
  );
}
