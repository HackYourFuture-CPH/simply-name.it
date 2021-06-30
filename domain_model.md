# Model-Driven Design

_Last edited 2021-06-30_

## Introduction

The domain model describes the elements and their interactions that abstract the
context of our application. The domain (or business logic) layer should
encapsulate all logic.

In the layered architecture-style, the user interface (presentation) layer and
the application layer themselves should not contain any logic relating to the
domain. Instead, they only coordinate the operation of elements in the domain
layer.

Finally, the infrastructure layer is where data gets persisted or other services
are provided, for example, storage of models in a relational database or sending
out notifications.

![A conceptual diagram of layered
architecture.](layered_architecture.png)

## Domain Model

![The domain model for our just-name-it
application.](election_board_class_diagram.svg)

### Main Entities

* `User`: _Users_ sign up to our application and are completely independent
  entities
* `ElectionBoard`: This entity is the main unit of organization and the root of
  an aggregate

Within an _election_, _users_ either participate as the _creator_ (_owner_) of
the _election_ (_board_) or as _members_ added to the _board_.  In the context
of an _election_, _users_ are _members_ who have a _role_ (_permissions_)
assigned by the _owner_ and they each can control their _ballot_.  The _ballot_
is a _ranking_ of the available _candidates_.

The _creator_ or _members_ with the right _permissions_ can add more
_candidates_ or _block_ _candidates_ that may then not appear in any _ranking_.
When the _deadline_ of the _election_ passes, the _outcome_ is generated and no
more modifications of the _board_ are possible.
