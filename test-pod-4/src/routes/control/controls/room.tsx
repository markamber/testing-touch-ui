import { createFileRoute } from '@tanstack/react-router'
import {LightBoard} from "../../../components/LightBoard/LightBoard.tsx";
import {Card, Container} from "@mantine/core";

export const Route = createFileRoute('/control/controls/room')({
  component: () =>
      <Container p={'sm'}>
        <Card withBorder>
          <LightBoard/>
        </Card>
      </Container>,
})
