import { createFileRoute } from '@tanstack/react-router'
import {PtzControl} from "../../../components/PtzControl/PtzControl.tsx";
import {Container, Group} from "@mantine/core";
import VideoPreview from "../../../components/VideoPreview/VideoPreview.tsx";

export const Route = createFileRoute('/control/controls/camera')({
  component: () => (
      <Container p={'sm'}>
          <Group>
          <VideoPreview/>
          <PtzControl/>

          </Group>
      </Container>
  )
})
