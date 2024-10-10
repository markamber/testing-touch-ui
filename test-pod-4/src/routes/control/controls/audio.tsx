import { createFileRoute } from '@tanstack/react-router'
import {Card, Container, Switch} from "@mantine/core";
import TestMeters from "../../../components/TestMeters/TestMeters.tsx";

export const Route = createFileRoute('/control/controls/audio')({
  component: () => (
      <Container p='sm'>
        <Card withBorder>
          <Switch label='Control Room Mic in Mix'/>
            <TestMeters/>
        </Card>
      </Container>

  ),
})
