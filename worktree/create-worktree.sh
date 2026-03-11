#!/bin/bash
if [ $# -eq 0 ]; then
    echo "Error: 워크트리 이름을 입력해 주세요."
    return 1
fi

ARGUMENT=$1
WORKTREE_PATH="worktrees/$ARGUMENT"

if git worktree add "$WORKTREE_PATH" main; then
    echo "워크트리가 성공적으로 생성되었습니다: $WORKTREE_PATH"
    cd "$WORKTREE_PATH" || return 1
    echo "디렉토리 변경 완료 $(pwd)"
    claude
else
    echo "Error: 워크트리 생성에 실패했습니다."
    return 1
fi