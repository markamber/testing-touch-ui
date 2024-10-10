import { createFileRoute } from '@tanstack/react-router'
import {Card, Container, Stack, Text} from "@mantine/core";
import {PickNDrag} from "../../../components/PickNDrag/PickNDrag.tsx";

export const Route = createFileRoute('/control/controls/video')({
  component: () => (
      <Container p={'sm'} >
          <Stack w={800}>
              <Card withBorder>
                  <Text>Drag an input to an output to assign.</Text>
                  <Text>Click on an output to control it further</Text>
              </Card>
              <PickNDrag/>
          </Stack>
      </Container>
  ),
})
