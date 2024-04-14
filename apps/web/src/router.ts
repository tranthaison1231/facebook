// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/:id`
  | `/friends`
  | `/groups/discover`
  | `/groups/feed`
  | `/groups/joins`
  | `/login`
  | `/posts`
  | `/profile/profileHeader`
  | `/reset-password`
  | `/search/people`
  | `/search/photos`
  | `/search/posts`
  | `/sign-up`

export type Params = {
  '/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
