# Application Structure

We can divide an application into three parts/layers:

| Type       | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| Components | Provides the basic functionality for the app. High dependency. |
| Services   | Used from time to time. Low dependency.                      |
| Libraries  | Zero dependency. Building blocks for components and services. |

## Components



| Component              | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| Request                | Provides request information.                                |
| Response               | Represents various response types.                           |
| Router                 | Maps requests to responses/controllers.                      |
| Controller             | Handles requests, builds responses.                          |
| AuthNZ                 | Checks credentials and permissions.                          |
| Language               | Handles translations.                                        |
| Notifications          | Persists arbitrary messages to the (next) session.           |
| Form Validation Errors | Persists messages from form submission to the (next) session. |
| Events                 | Publishes events and subscribes event listeners.             |
| Config                 | Stores application settings (in the file-system).            |
| Settings               | Stores application settings (in the database).               |



## Services

A service can be created from any library, but not every service is a library. Services might have functionality specific to an app. Libraries are (should be) free spirits.



## Libraries

The moment a library has some sort of dependency (use app data), it becomes a component or a service.

Libraries needed for creating *Models*:

| Library            | Description                                          |
| ------------------ | ---------------------------------------------------- |
| Query Builder      | Allows building SQL queries quickly and dynamically. |
| Data Access Object | Provides generic data(base) access.                  |
| ORM                | Provides object-data(base) mapping.                  |

Other libraries that might be needed:

| Library          | Description                            |
| ---------------- | -------------------------------------- |
| Data Validator   | Validates data using criteria.         |
| Document         | Allows dynamic HTML document creation. |
| Email            | Allows sending e-mails.                |
| File Upload      | Handles file uploads.                  |
| File Validator   | Validates file.                        |
| Image Processing | Handles image operations.              |

