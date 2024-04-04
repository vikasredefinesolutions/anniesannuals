# Folder Structure


### app (layer):


- No static import could be made directly from any store.
- No store code check should be used.

### features (layer):

- No view component should be present here.

### shared (layer):

#### apis ():

- Each file should contain a single API including response and payload types.

#### apis ():

- Each file should contain a single API including response and payload types.

### configs (layer):

- Global config files should be added here.

### stores (layer):

- Stores should contain only the view components. No business logic should be present in any store.
- No direct communication should happen between two stores
- General functionality functions should be define globally in root-shared folder.
- Store specific functions should be defined in store-shared folder within the scope of the store.

# Goals:

    - SEO ( JS Bundle Size should be small );
        - Unnecessay library should be avoided.
        - Dynamic Imports
        - Clarification SSR or CSR
    - Features ( Plug n Play )
        - Seperated Code
