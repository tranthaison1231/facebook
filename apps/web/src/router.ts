// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/:id`
  | `/:id/about`
  | `/:id/friends`
  | `/:id/posts/:postId`
  | `/friends`
  | `/groups/discover`
  | `/groups/feed`
  | `/groups/joins`
  | `/latest/content-calendar`
  | `/login`
  | `/marketplace`
  | `/marketplace/category/:id`
  | `/marketplace/create`
  | `/marketplace/create/Status`
  | `/marketplace/create/item`
  | `/marketplace/inbox`
  | `/marketplace/notifications`
  | `/posts`
  | `/profile/profileHeader`
  | `/reset-password`
  | `/search/people`
  | `/search/photos`
  | `/search/posts`
  | `/sign-up`

export type Params = {
  '/:id': { id: string }
  '/:id/about': { id: string }
  '/:id/friends': { id: string }
  '/:id/posts/:postId': { id: string; postId: string }
  '/marketplace/category/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
