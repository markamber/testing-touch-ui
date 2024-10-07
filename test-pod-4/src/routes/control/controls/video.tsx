import { createFileRoute } from '@tanstack/react-router'
import {Center} from "@mantine/core";
import {PickNDrag} from "../../../components/PickNDrag/PickNDrag.tsx";

export const Route = createFileRoute('/control/controls/video')({
  component: () => (
      <Center p={'sm'}>
        <PickNDrag/>
      </Center>
  ),
})
