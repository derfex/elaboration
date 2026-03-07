import { defineStore } from 'pinia'
import { computed, type ComputedRef, shallowRef } from 'vue'

export const useNotificationMessagesStore = defineStore('notification-messages', (): NotificationMessagesStoreAPI => {
  const _list = shallowRef<List>([])

  // # API

  const create = _createItem
  const queue = computed(() => _createQueue(_list.value))
  const setQueue = _setQueue

  return {
    create,
    queue,
    setQueue,
  }

  // # Private logic

  function _createItem({ color, text }: NotificationMessage): void {
    _list.value = [..._list.value, { color, text }]
  }

  function _createQueue(list: List): Queue {
    return list.map(({ color, text }: NotificationMessage): QueueNotificationMessage => ({ color, text }))
  }

  function _setQueue(queue: Queue): void {
    _list.value = queue.map(({ color, text }: NotificationMessage): NotificationMessage => ({ color, text }))
  }
})

export interface NotificationMessage {
  readonly color: 'error' | 'success'
  readonly text: string
}

type List = readonly NotificationMessage[]
interface NotificationMessagesStoreAPI {
  readonly create: (message: NotificationMessage) => void
  readonly queue: ComputedRef<Queue>
  readonly setQueue: (queue: Queue) => void
}
interface QueueNotificationMessage {
  readonly color: NotificationMessage['color']
  readonly text: NotificationMessage['text']
}
type Queue = readonly QueueNotificationMessage[]
