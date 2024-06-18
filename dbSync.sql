CREATE OR REPLACE FUNCTION notify_trigger() RETURNS trigger AS $$
DECLARE
    data json;
    notification json;
BEGIN
    -- Convert the old or new data row to JSON for notification
    IF (TG_OP = 'DELETE') THEN
        data = row_to_json(OLD);
    ELSE
        data = row_to_json(NEW);
    END IF;

    -- Create a JSON payload for the Notify event
    notification = json_build_object(
            'table', TG_TABLE_NAME,
            'action', TG_OP,
            'data', data);

    -- Execute pg_notify(channel, payload)
    PERFORM pg_notify('my_table_changes', notification::text);

    -- Result is ignored since this is an AFTER trigger
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER my_table_changes
    AFTER INSERT OR UPDATE OR DELETE ON my_table
    FOR EACH ROW EXECUTE PROCEDURE notify_trigger();