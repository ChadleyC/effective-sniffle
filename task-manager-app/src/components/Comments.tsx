import React, { useEffect, useState, useCallback } from "react";
import { getComments, addComment } from "../services/commentService";
import type { Comment } from "../types";

const Comments = ({ taskId }: { taskId: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  const loadComments = useCallback(async () => {
    const data = await getComments(taskId);
    setComments(data);
  }, [taskId]);

  useEffect(() => {
    let cancelled = false;
    getComments(taskId).then((data) => {
      if (!cancelled) setComments(data);
    });
    return () => {
      cancelled = true;
    };
  }, [taskId]);

  const submit = async () => {
    if (!text.trim()) return;
    await addComment(taskId, text);
    setText("");
    loadComments();
  };

  return (
    <div className="space-y-4">
      <h4 className="font-h3 text-h3">Comments</h4>
      <div className="space-y-2">
        {comments.map((c) => (
          <div key={c.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-body-sm font-bold text-slate-900">{c.user?.username || 'User'}</p>
            <p className="text-body-sm text-on-surface-variant">{c.content}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-body-sm focus:ring-2 focus:ring-primary outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button 
          className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-label-sm"
          onClick={submit}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Comments;
